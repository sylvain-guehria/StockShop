type IPricingFeatureProps = {
  text: string;
};

const PricingFeature = (props: IPricingFeatureProps) => (
  <li className="flex items-center mt-2">
    <svg
      className="stroke-current stroke-2 text-green-500 h-6 w-6 mr-2"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M0 0h24v24H0z" stroke="none" />
      <path d="M5 12l5 5L20 7" />
    </svg>
    {props.text}
  </li>
);

export { PricingFeature };
