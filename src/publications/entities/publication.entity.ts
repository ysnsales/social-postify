export class Publication {
    private _mediaId: number;
    private _postId: number;
    private _date: Date;
    constructor(mediaId: number, postId: number, date: Date) {
      this._date = date;
      this._mediaId = mediaId;
      this._postId = postId;
    }
  
    get mediaId() {
      return this._mediaId;
    }
  
    get postId() {
      return this._postId;
    }
  
    get date() {
      return this._date;
    }
  }