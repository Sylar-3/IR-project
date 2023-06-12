import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { DatasetResponseModel, QueriesService } from './queries.service';
import { take, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title: string = 'IR Project';
  queryForm!: FormGroup;
  suggestionsList: string[] = [];
  output: Array<DatasetResponseModel> = [];
  validation: Array<ValidationData> = []

  constructor(private _fb: FormBuilder, private _queryService: QueriesService) {
    this.queryForm = this._fb.group({
      input: this._fb.control(''),
    });

    this.validation = [
      {
        name: "qoura",
        data: {
          MAP: '0.2160021602329295',
          Mrr: '0.08106743683666758',
          precision: '20.88757396449704',
          recall: '2.1222606337248'
        }
      },
      {
        name: "covid",
        data: {
          MAP: "0.9963206349206349",
          Mrr: '0.2784444444444444',
          precision: '85.59999999999997',
          recall: '0.00012911833695582'
        }
      }
    ]
  }

  ngOnInit(): void { }

  public getControl(): AbstractControl {
    return this.queryForm.get('input')!;
  }

  public setControl(value: string): void {
    this.queryForm.get('input')?.setValue(value);
  }

  public copy(word: string) {
    console.log(word);
    this.setControl(word);
  }

  public updateQuery(): void {
    console.log(this.getControl());

    this._queryService
      .suggest(this.getControl().value)
      .pipe(
        take(1),
        tap((list: string[]) => {
          this.suggestionsList = list;
        })
      )
      .subscribe();
  }

  public searchAll(): void {
    this._queryService
      .searchBoth(this.getControl().value)
      .pipe(take(1), tap((item: Array<DatasetResponseModel>) => {
        this.output = item;
        this.output.pop()
      }))
      .subscribe();
  }

  private validateBoth(): void {
    this._queryService.validation('qoura').pipe(take(1), tap((item) => {
      this.validation.push(item)
    })).subscribe()
    this._queryService.validation('covid').pipe(take(1), tap((item) => {
      this.validation.push(item)
    })).subscribe()
  }
}

export interface ValidationJSON {
  MAP: string,
  Mrr: string,
  precision: string,
  recall: string
}

interface ValidationData {
  name: string;
  data: ValidationJSON;
}
