export interface Detected {
  misc: {title:string,why:string}[]
  colors:{title:string,why:string}[]
  sweeteners:{title:string,why:string}[]
  unknown:string[]
}

export interface Result {
  title: string
  why: string
}
