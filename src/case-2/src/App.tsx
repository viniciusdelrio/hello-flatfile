import React, { Dispatch, SetStateAction, useState } from "react";
import { ISpace, useSpace } from "@flatfile/react";
import { workbook } from "./workbook";
import { listener } from "./listener";

const spaceProps: ISpace = {
  name: "Embedded Space",
  publishableKey: "pk_3dd6ee8679994ee5b421f17b91524fee",
  environmentId: "us_env_QzZ1nMYH",
};

const Space = ({
  setShowSpace,
}: {
  setShowSpace: Dispatch<SetStateAction<boolean>>;
}) => {
  const space = useSpace({
    ...spaceProps,
    workbook,
    listener,
    sidebarConfig: {
      showSidebar: false,
    },
    themeConfig: {
      root: {
        primaryColor: "red",
      },
      sidebar: {
        logo: "https://images.ctfassets.net/hjneo4qi4goj/gL6Blz3kTPdZXWknuIDVx/7bb7c73d93b111ed542d2ed426b42fd5/flatfile.svg",
      },
    },
    closeSpace: {
      operation: "contacts:submit",
      onClose: () => setShowSpace(false),
    },
  });
  return space;
};

export default function App() {
  const [showSpace, setShowSpace] = useState(false);

  return (
    <div className="content">
      <h2>
        <code>&lt;Flatfile /&gt;</code>
      </h2>
      <p>Embed Flatfile in just a few lines of code.</p>
      {/*Button to trigger the modal */}
      <div>
        <button
          className="contrast"
          onClick={() => {
            setShowSpace(!showSpace);
          }}
        >
          {showSpace === true ? "Close" : "Open and create new"} Space
        </button>
        {showSpace && <Space setShowSpace={setShowSpace} />}
      </div>
    </div>
  );
}
