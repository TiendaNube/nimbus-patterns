import { ElementFormatType, NodeKey, Spread } from "lexical";
import { SerializedDecoratorBlockNode } from "@lexical/react/LexicalDecoratorBlockNode";

export type YouTubeComponentProps = Readonly<{
  className: Readonly<{
    base: string;
    focus: string;
  }>;
  format: ElementFormatType | null;
  nodeKey: NodeKey;
  videoID: string;
}>;

export type SerializedYouTubeNode = Spread<
  {
    videoID: string;
  },
  SerializedDecoratorBlockNode
>;
