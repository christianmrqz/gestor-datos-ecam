import React from "react";

interface ContentListProps {
  json: any[];
  onEdit: (item: any) => void;
  onDelete: (itemId: number) => void;
}

const ContentList: React.FC<ContentListProps> = ({
  json,
  onDelete,
}) => {
  return (
    <div>
      {json.map((item, index) => (
        <div key={index} className="mb-8 border-2 rounded-xl p-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              ID: {item.info ? item.info.id : "ID not available"}
            </h3>
            <div>
              <button
                className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded"
                onClick={() => onDelete(item.info.id)}
              >
                Delete
              </button>
            </div>
          </div>
          {item.content && item.content.length > 0 && (
            <div className="flex flex-wrap">
              {item.content.map((contentItem: any, contentIndex: number) => (
                <ContentItem key={contentIndex} content={contentItem} />
              ))}
            </div>
          )}
          {item.info.id > 5 && (
            <div>
                <ContentItem content={item} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

interface ContentItemProps {
  content: any;
}

const ContentItem: React.FC<ContentItemProps> = ({ content }) => {
  return renderContentByType(content);
};

const renderContentByType = (content: any) => {
  switch (content.type) {
    case "image":
      return (
        <>
          <div className="m-4 w-[45%] p-2 border rounded-xl border-black">
            <div className="flex justify-around">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white uppercase">
                {content.type}
              </h3>
              <img
              src="imagen.png"
              alt={content.title ?? "Image"}
              className="mb-2 w-1/12 h-auto"
              />
            </div>
            <h4 className="mb-1 text-md font-semibold text-gray-900 dark:text-white">
              {content.title ?? "No Title"}
            </h4>
            <p className="mb-1 text-gray-700 dark:text-gray-300">
              {content.desc ?? "No Description"}
            </p>
          </div>
        </>
      );
    case "video":
      return (
        <>
          <div className="m-4 w-[45%] p-2 border rounded-xl border-black">
            <div className="flex justify-around">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white uppercase">
                {content.type}
              </h3>
              <video
                  controls
                  src={content.url ?? ""}
                  className="w-1/6 h-auto"
                />
            </div>
            <h4 className="mb-1 text-md font-semibold text-gray-900 dark:text-white">
              {content.title ?? "No Title"}
            </h4>
            <p className="mb-1 text-gray-700 dark:text-gray-300">
              {content.desc ?? "No Description"}
            </p>
          </div>
        </>
      );
    case "modelo2d":
      return (
        <>
        <div className="m-4 w-[45%] p-2 border rounded-xl border-black">
        <div className="flex justify-around">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white uppercase">
                {content.type}
              </h3>
              <img
              src="imagen.png"
              alt={content.title ?? "Image"}
              className="mb-2 w-1/12 h-auto"
              />
            </div>
          <h4 className="mb-1 text-md font-semibold text-gray-900 dark:text-white">
            {content.title ?? "No Title"}
          </h4>
          <p className="mb-1 text-gray-700 dark:text-gray-300">
            {content.desc ?? "No Description"}
          </p>
          <ul>
            {content.hotspots.map((hotspot: any, index: number) => (
              <li key={index} className="text-gray-700 dark:text-gray-300">
                <strong>{hotspot.title}:</strong> {hotspot.text}
              </li>
            ))}
          </ul>
        </div>
      </>
      );
    case "game":
      return (
        <>
          <div className="m-4 w-[45%]  p-2 border rounded-xl border-black">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white uppercase">
              {content.type} - ID: {content.gameID}
            </h3>
            <h4 className="mb-1 text-md font-semibold text-gray-900 dark:text-white">
              {content.title ?? "No Title"}
            </h4>
            <p className="mb-1 text-gray-700 dark:text-gray-300">
              {content.desc ?? "No Description"}
            </p>
          </div>
        </>
      );
    default:
      return null;
  }
};

export default ContentList;
