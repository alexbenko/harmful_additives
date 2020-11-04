export type Dictionary = {
  cancer: object
  colors: object
  sweeteners: object
}

export interface Detected {
  misc: {title:string,why:string}[]
  colors:{title:string,why:string}[]
  sweeteners:{title:string,why:string}[]
  unknown:string[]
}
