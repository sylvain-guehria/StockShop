type ITestimonialCardProps = {
  image: {
    src: string;
    alt: string;
  };
  text: string;
  author: {
    name: string;
    position: string;
  };
};

const TestimonialCard = (props: ITestimonialCardProps) => (
  <div className="p-6">
    <div className="flex items-center">
      <img
        className="w-16 h-16 rounded-full bg-primary-400"
        src={props.image.src}
        alt={props.image.alt}
      />

      <div className="ml-2">
        <div className="text-gray-900 font-bold">{props.author.name}</div>
        <div className="text-gray-700 font-medium">{props.author.position}</div>
      </div>
    </div>

    <div className="mt-6 text-lg">{props.text}</div>
  </div>
);

export { TestimonialCard };
