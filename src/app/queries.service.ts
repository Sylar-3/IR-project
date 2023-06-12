import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class QueriesService {
  ENDPOINTS = {
    trecCovid: 'http://127.0.0.1:5000/trec_covid/search',
    quora: 'http://127.0.0.1:5000/qoura/search',
    search: 'http://127.0.0.1:5000/search',
    precision: 'http://127.0.0.1:5000/precision',
    recall: 'http://127.0.0.1:5000/recall',
    validation: 'http://127.0.0.1:5000/valdition',
    map: 'http://127.0.0.1:5000/map',
    mrr: 'http://127.0.0.1:5000/mrr',
    suggestion: 'http://127.0.0.1:5000/suggest_queries',
  };

  constructor(private _http: HttpClient) { }

  public searchTrec(query: string): Observable<Array<DatasetResponseModel>> {
    const param: HttpParams = new HttpParams().appendAll({
      query: query,
    });

    return this._http.get<Array<DatasetResponseModel>>(this.ENDPOINTS.trecCovid, {
      params: param,
    });
  }

  public searchQuora(query: string): Observable<Array<DatasetResponseModel>> {
    const param: HttpParams = new HttpParams().appendAll({
      query: query,
    });

    return this._http.get<Array<DatasetResponseModel>>(this.ENDPOINTS.quora, {
      params: param,
    });
  }

  public searchBoth(query: string): Observable<DatasetResponseModel[]> {
    const param: HttpParams = new HttpParams().appendAll({
      query: query,
    });

    return this._http.get<Array<DatasetResponseModel>>(this.ENDPOINTS.search, {
      params: param,
    });
  }

  public precision(dataset: string): Observable<any> {
    const param: HttpParams = new HttpParams().appendAll({
      dataset: dataset,
    });

    return this._http.get<any>(this.ENDPOINTS.precision, {
      params: param,
    });
  }

  public recall(dataset: string): Observable<any> {
    const param: HttpParams = new HttpParams().appendAll({
      dataset: dataset,
    });

    return this._http.get<any>(this.ENDPOINTS.recall, {
      params: param,
    });
  }

  public validation(dataset: string): Observable<any> {
    const param: HttpParams = new HttpParams().appendAll({
      dataset: dataset,
    });

    return this._http.get<any>(this.ENDPOINTS.validation, {
      params: param,
    });
  }

  public mapValidate(dataset: string): Observable<any> {
    const param: HttpParams = new HttpParams().appendAll({
      dataset: dataset,
    });

    return this._http.get<any>(this.ENDPOINTS.map, {
      params: param,
    });
  }

  public mrr(dataset: string): Observable<any> {
    const param: HttpParams = new HttpParams().appendAll({
      dataset: dataset,
    });

    return this._http.get<any>(this.ENDPOINTS.mrr, {
      params: param,
    });
  }

  public suggest(query: string): Observable<string[]> {
    const param: HttpParams = new HttpParams().appendAll({
      query: query,
    });

    return this._http.get<string[]>(this.ENDPOINTS.suggestion, {
      params: param,
    });
  }
}

export interface DatasetResponseModel {
  text: string
  title: string
  _id: string
}