export const ChatDisplay = () => {
  const chats = [
    {
      msg: "Lorem sit am",
      isMine: true,
    },
    {
      msg: "Lorem ipsum dolor sit am",
      isMine: false,
    },
    {
      msg: " ipsum dolor sit am",
      isMine: true,
    },
    {
      msg: "Lorem",
      isMine: true,
    },
    {
      msg: "Loremsit am",
      isMine: false,
    },
  ];

  return (
    <ul className="grow flex flex-col-reverse w-full px-3">
      {chats.map(({ msg, isMine }, i) => {
        if (isMine) {
          return (
            <li
              className="self-end bg-blue-400 rounded-l-xl w-fit break-words text-center rounded-tr-2xl my-4 p-1"
              key={i}
            >
              <div>{msg + i}</div>
            </li>
          );
        }
        return (
          <li
            className="bg-blue-400  rounded-r-xl rounded-tl-2xl w-fit break-words text-center my-4 p-1"
            key={i}
          >
            <div>{msg + i}</div>
          </li>
        );
      })}
    </ul>
  );
};
