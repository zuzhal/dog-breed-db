import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  Input,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { IDog, IDogImageDetailFE } from '../../../model/dog';
import { DogService } from '../../../services/dog.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemComponent {
  @Input({ required: true }) dog!: IDog;

  public isOpen = false;
  public dogService = inject(DogService);
  public imageDetail?: IDogImageDetailFE;

  private _destroyRef = inject(DestroyRef);
  private _cdr = inject(ChangeDetectorRef);

  /* For bigger applications, I prefer to use Smart & Dumb components,
   ** therefore the injecting would be centralized in the parent component.
   ** I did not want to overcomplicated things for this demo.
   */
  public fetchDetail(refImageId: string) {
    this.dogService
      .getDogDetail(refImageId)
      .pipe(
        map((data) => {
          return {
            ...data,
            breeds: {
              ...data.breeds[0],
              life_span: data.breeds[0].life_span
                .split(' ')
                .filter((word) => word.toLowerCase() !== 'years')
                .join(' '),
            },
          };
        }),
        takeUntilDestroyed(this._destroyRef)
      )
      .subscribe((data: IDogImageDetailFE) => {
        this.imageDetail = data;
        this.isOpen = true;
        this._cdr.detectChanges();
      });
  }

  public close() {
    this.imageDetail = undefined;
    this.isOpen = false;
  }
}
