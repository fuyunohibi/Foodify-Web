const AddRecipePage = () => {
  return (
    <section className=" bg-secondary-200 flex flex-col w-full h-full rounded-[3rem]">
      <div className="flex flex-row justify-between items-center px-4 py-2">
        <h1 className="text-2xl font-bold text-primary-200">Search</h1>
      </div>
      <div className="flex flex-row justify-between items-center px-4 py-2">
        <h1 className="text-2xl font-bold text-primary-200">Popular</h1>
      </div>
      <div className="flex flex-row justify-between items-center px-4 py-2">
        <h1 className="text-2xl font-bold text-primary-200">For you</h1>
      </div>
    </section>
  );
};

export default AddRecipePage;
