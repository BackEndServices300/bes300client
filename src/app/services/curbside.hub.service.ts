
import { Injectable } from '@angular/core';
import * as signalR from '@aspnet/signalr';

import { BehaviorSubject, Observable } from 'rxjs';
import { OrderCreate } from '../models/order-create';
import { OrderEntity } from '../reducers/async.reducer';

@Injectable()
export class CurbsideHubService {

    private hubConnnection: signalR.HubConnection;
    private subject$: BehaviorSubject<OrderEntity>;
    private order: OrderEntity;

    constructor() {
        this.hubConnnection = new signalR.HubConnectionBuilder().withUrl('http://localhost:3000/curbsidehub').build();
        this.hubConnnection.start()
            .then(c => console.log('Hub Conection Started'))
            .catch(err => console.error('Hub connected failed', err));

        this.subject$ = new BehaviorSubject<OrderEntity>(null);

        this.hubConnnection.on('OrderPlaced', (data) => {
            this.order = data;
            this.subject$.next(this.order);
        });

        this.hubConnnection.on('OrderProcessed', (data) => {
            this.order = data;
            this.subject$.next(this.order);
        });

        this.hubConnnection.on('ItemProcessed', (data) => {
            this.order.location = data.message;
            this.subject$.next(this.order);
        });

        this.hubConnnection.on('ShoppingItemAdded', (data => {
            console.log('Somebody added a shopping Item!', data);
        }))

    }

    sendOrder(request: OrderCreate): void {
        this.hubConnnection.send('PlaceOrder', request);
    }

    getOrder(): Observable<OrderEntity> {
        return this.subject$.asObservable();
    }
}


/*
/curbsidehub
PlaceOrder -> send an order
OrderPlaced <- receive the order after you place it.
ItemProcessed <- An individual item was processed {message: string}
OrderProcessed <- The entire order has been processed (that order.)

*/