import { Injectable } from '@angular/core'
import { Observable, of, EMPTY } from 'rxjs'
import { mergeMap, share } from 'rxjs/operators'
import * as io from 'socket.io-client'

import { environment } from 'src/environments/environment'

import { EthstatsNode, EthstatsCharts } from './store/ethstats'

export interface EthstatsServiceDataNode {
  action: 'init' | 'add' | 'block' | 'pending' | 'stats'
  data: Partial<EthstatsNode>
}
export interface EthstatsServiceDataCharts {
  action: 'charts'
  data: EthstatsCharts
}

export type EthstatsServiceData = EthstatsServiceDataNode | EthstatsServiceDataCharts

@Injectable({
  providedIn: 'root'
})
export class EthstatsService {
  private data$: Observable<EthstatsServiceData>
  private socket: SocketIOClient.Socket

  constructor() {
    const url = environment.ethstatsService
    this.socket = io(url, {
      path: '/client',
      transports: ['websocket'],
    })
    this.data$ = new Observable<any>(observer => {
      this.socket.on('block', data => observer.next({action: 'block', data}))
      this.socket.on('lastBlock', data => observer.next({action: 'lastBlock', data}))
      this.socket.on('pending', data => observer.next({action: 'pending', data}))
      this.socket.on('latency', data => observer.next({action: 'latency', data}))
      this.socket.on('add', data => observer.next({action: 'add', data}))
      this.socket.on('stats', data => observer.next({action: 'stats', data}))
      this.socket.on('charts', data => observer.next({action: 'charts', data}))
      this.socket.on('init', data => observer.next({action: 'init', data}))
      this.socket.on('inactive', data => observer.next({action: 'inactive', data}))

      this.socket.on('error', e => observer.error(e))
      this.socket.on('connect', () => this.socket.emit('ready'))

      // setTimeout(() => this.socket.close(), 2000)
    })
      .pipe(
        mergeMap(_ => of(_)),
        share(),
      )
  }

  data<type extends 'node' | 'charts'>(): Observable<type extends 'node' ? EthstatsServiceDataNode : EthstatsServiceDataCharts> {
    return this.data$ as any
  }
}
