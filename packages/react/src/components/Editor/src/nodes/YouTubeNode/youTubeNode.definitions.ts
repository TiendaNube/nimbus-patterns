import { DOMConversionOutput, LexicalNode } from "lexical";
import { YouTubeNode } from "./YouTubeNode";

export const $createYouTubeNode = (videoID: string): YouTubeNode =>
  new YouTubeNode(videoID);

export const $isYouTubeNode = (
  node: YouTubeNode | LexicalNode | null | undefined
): node is YouTubeNode => node instanceof YouTubeNode;

export const convertYoutubeElement = (
  domNode: HTMLElement
): null | DOMConversionOutput => {
  const videoID = domNode.getAttribute("data-lexical-youtube");
  if (videoID) {
    const node = $createYouTubeNode(videoID);
    return { node };
  }
  return null;
};
