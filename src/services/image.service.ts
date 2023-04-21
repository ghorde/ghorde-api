export interface ImageDoc {
  owner: string;
  imgLink: string;
  time: number;
}

export interface ImageRequest {
  owner: string;
  prompt: string;
  link: string;
}

export function isValidImageRequest(arg: any): arg is ImageRequest {
  return (
    arg &&
    arg.owner &&
    typeof arg.owner == "string" &&
    typeof arg.link == "string" &&
    (arg.prompt ? typeof arg.prompt == "string" : true)
  );
}
