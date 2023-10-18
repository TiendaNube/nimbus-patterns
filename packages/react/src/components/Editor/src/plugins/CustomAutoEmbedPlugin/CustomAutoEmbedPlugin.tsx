import React, { useMemo, useState } from "react";
import { Button, Modal } from "@nimbus-ds/components";
import { FormField } from "@nimbus-ds/formfield";
import {
  AutoEmbedOption,
  EmbedMatchResult,
  LexicalAutoEmbedPlugin,
  URL_MATCHER,
} from "@lexical/react/LexicalAutoEmbedPlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { PlaygroundEmbedConfig } from "./customAutoEmbedPlugin.types";
import { YoutubeEmbedConfig } from "./customAutoEmbedPlugin.definitions";
import { debounce } from "../../utils";

const CustomAutoEmbedPlugin: React.FC = () => {
  const [editor] = useLexicalComposerContext();

  const [text, setText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const handleModal = () => setShowModal((prevState) => !prevState);

  const [embedResult, setEmbedResult] = useState<EmbedMatchResult | null>(null);
  const [embedConfig, setEmbedConfig] = useState<PlaygroundEmbedConfig | null>(
    null
  );
  const openEmbedModal = (currentEmbedConfig: PlaygroundEmbedConfig) => {
    setEmbedConfig(currentEmbedConfig);
    handleModal();
  };

  const getMenuOptions = (
    activeEmbedConfig: PlaygroundEmbedConfig,
    embedFn: () => void,
    dismissFn: () => void
  ) => [
    new AutoEmbedOption("Dismiss", {
      onSelect: dismissFn,
    }),
    new AutoEmbedOption(`Embed ${activeEmbedConfig.contentName}`, {
      onSelect: embedFn,
    }),
  ];

  const validateText = useMemo(
    () =>
      debounce((inputText: string) => {
        const urlMatch = URL_MATCHER.exec(inputText);

        if (embedConfig != null && inputText != null && urlMatch != null) {
          Promise.resolve(embedConfig.parseUrl(inputText)).then(
            (parseResult) => {
              setEmbedResult(parseResult);
            }
          );
        } else if (embedResult != null) {
          setEmbedResult(null);
        }
      }, 200),
    [embedConfig, embedResult]
  );

  const onClick = () => {
    if (embedResult != null) {
      embedConfig?.insertNode(editor, embedResult);
      handleModal();
    }
  };

  return (
    <>
      <Modal open={showModal} onDismiss={handleModal}>
        <Modal.Header title="Embed Youtube Video" />
        <Modal.Body padding="none">
          <FormField.Input
            label="URL"
            value={text}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const { value } = e.target;
              setText(value);
              validateText(value);
            }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button disabled={!embedResult} onClick={onClick}>
            Embed
          </Button>
        </Modal.Footer>
      </Modal>
      <LexicalAutoEmbedPlugin<PlaygroundEmbedConfig>
        embedConfigs={[YoutubeEmbedConfig]}
        onOpenEmbedModalForConfig={openEmbedModal}
        getMenuOptions={getMenuOptions}
        menuRenderFn={() => null}
      />
    </>
  );
};

export { CustomAutoEmbedPlugin };
