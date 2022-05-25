import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

export function fakeRouterStateSnapshot(
  optionList: Partial<RouterStateSnapshot>
) {
  return optionList as RouterStateSnapshot;
}

export function fakeActivatedRouteSnapshot(
  optionList: Partial<ActivatedRouteSnapshot>
) {
  return optionList as ActivatedRouteSnapshot;
}
