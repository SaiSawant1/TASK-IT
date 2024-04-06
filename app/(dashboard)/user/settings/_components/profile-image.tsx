export const ProfileImage = () => {
  return (
    <div className="h-full w-full">
      <h1 className="text-xl font-semibold">Profile Photo</h1>
      <div className="flex justify-evenly shadow-black shadow-lg flex-col h-48 rounded-lg">
        <div className="relative grow bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 rounded-t-lg">
          <div className="absolute h-24 left-11 top-7 w-24 rounded-[100%] bg-black"></div>
        </div>
        <div className="grow"></div>
      </div>
    </div>
  );
};
