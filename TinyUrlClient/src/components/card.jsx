const CardComponent = ({header, text, picture}) => {
  return (
    <div className="w-full rounded-lg shadow-md lg:max-w-sm m-4">
      <img
        className="object-cover w-full h-48 rounded-md"
        src={picture? picture: "https://cdn.pixabay.com/photo/2022/08/18/09/20/houses-7394390__340.jpg"}
        alt="image"
      />
      <div className="p-4">
        <h4 className="text-xl font-semibold tracking-tight text-blue-600">
          {header? header: "Title"}
        </h4>
        <p className="mb-2 leading-normal">
          {text? text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
        </p>
      </div>
    </div>
  );
}


export default CardComponent;