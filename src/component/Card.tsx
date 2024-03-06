const Card = (props: { value: any }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <img
        className="w-full h-48 object-cover object-center"
        src={props.value.avatar}
        alt={props.value.first_name}
      />
      <div className="p-4">
        <h2 className="text-gray-800 font-semibold text-lg mb-2">
          {props.value.first_name} {props.value.last_name}
        </h2>
        <p className="text-gray-600 text-sm"> {props.value.email}</p>
      </div>
    </div>
  );
};

export default Card;
