import { TestBed } from '@angular/core/testing';

import { MapsService } from './maps.service';

describe('MapsService', () => {
  let mapService: MapsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MapsService],
    });
    mapService = TestBed.inject(MapsService);
  });

  it('should be created', () => {
    expect(mapService).toBeTruthy();
  });

  describe('test for getCurrentPosition', () => {
    it('should save the center', () => {
      // Arrange
      const lat = 123;
      const lng = 987;

      spyOn(navigator.geolocation, 'getCurrentPosition').and.callFake(
        (successFn) => {
          const mockGelocation = {
            coords: { latitude: lat, longitude: lng },
          };
          successFn(mockGelocation as any);
        }
      );

      // Act
      mapService.getCurrentPosition();

      // Asserts
      expect(mapService.center.lat).toEqual(lat);
      expect(mapService.center.lng).toEqual(lng);
    });
  });
});
