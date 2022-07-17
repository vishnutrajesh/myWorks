import { ImageUrlPipe } from './image-url.pipe';

describe('ImageUrlPipe', () => {
  it('create an instance', () => {
    const pipe = new ImageUrlPipe();
    expect(pipe).toBeTruthy();
  });
  it('should transform url', function () {
    let finalString: string = `url("https://www.artic.edu/iiif/2/467f4194-01b2-17cf-47c0-a514f609bbc8/full/843,/0/default.jpg")`;
    const pipe = new ImageUrlPipe();
    expect(pipe.transform('https://www.artic.edu/iiif/2', '467f4194-01b2-17cf-47c0-a514f609bbc8')).toEqual(finalString);
  });
});
