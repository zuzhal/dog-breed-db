import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IDog } from '../../../model/dog';
import { DogService } from '../../../services/dog.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent implements OnInit {
  public dogService = inject(DogService);
  public searchTerm = '';

  private _destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.dogService
      .getDogs()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe();
  }

  public trackById(_: number, dog: IDog): number {
    return dog.id;
  }
}
