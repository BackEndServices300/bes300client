
import { Injectable } from '@angular/core';
import * as signalR from '@aspnet/signalr';

import { BehaviorSubject, Observable } from 'rxjs';
import { OrderEntity } from '../reducers/async.reducer';

@Injectable()
export class CurbsideHubService {

    private hubConnnection: signalR.HubConnection;
    private subject$: BehaviorSubject<OrderEntity>;

    constructor() {
        this.hubConnnection = new signalR.HubConnectionBuilder().withUrl('http://localhost:3000/curbsidehub').build();
        this.hubConnnection.start()
            .then(c => console.log('Hub Conection Started'))
            .catch(err => console.error('Hub connected failed', err));

    }
}


/*
/curbsidehub
PlaceOrder -> send an order
OrderPlaces <- receive the order after you place it.
ItemProcess <- An individual item was processed {message: string}
OrderProcessed <- The entire order has been processed (that order.)

*/