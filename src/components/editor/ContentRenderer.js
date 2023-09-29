import Image from 'next/image';

export default function ContentRenderer({ content }) {
  return (
    <div>
      {content?.map((item, index) => {
        if (item.type === 'paragraph') {
          const renderHTML = (htmlString) => {
            return { __html: htmlString };
          };

          return (
            <p
              key={index}
              className="text-black text-base xl:text-lg tracking-wide leading-8 my-4"
              dangerouslySetInnerHTML={renderHTML(item.text)}
            />
          );
        } else if (item.type === 'h2') {
          return (
            <h2
              className="my-3 text-xl xl:text-4xl font-extrabold tracking-wide xl:mb-6"
              key={index}
            >
              {item.text}
            </h2>
          );
        } else if (item.type === 'h3') {
          return (
            <h3
              className="my-3 text-lg xl:text-3xl font-extrabold tracking-wide xl:mb-6"
              key={index}
            >
              {item.text}
            </h3>
          );
        } else if (item.type === 'image') {
          return (
            <Image
              key={index}
              width={100}
              height={100}
              className="w-full h-full my-4"
              src={item.data.src}
              alt={item.data.alt}
            />
          );
        } else if (item.type === 'list') {
          const renderHTML = (htmlString) => {
            return { __html: htmlString };
          };

          return (
            <div
              key={index}
              className="text-black text-base xl:text-lg tracking-wide leading-8 my-4"
              dangerouslySetInnerHTML={renderHTML(item.text)}
            />
          );
        }
      })}
    </div>
  );
}
