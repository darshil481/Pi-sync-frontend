interface SnipperLoaderProps {
  white?: boolean;
  showText?: boolean;
  className?: string;
  LoaderClassName?: string;
}

const SnipperLoader = ({
  showText = true,
  className,
  LoaderClassName,
}: SnipperLoaderProps) => {
  return (
    <div
      className={`min-h-[250px] py-6 flex items-center justify-center`}
    >
      <div className="text-center">
        <div
          className={"animate-spin mx-auto w-6 h-6 border-solid border-4 rounded-full" }
        ></div>
        {showText && <span className="inline-block mt-2">Loading...</span>}
      </div>
    </div>
  );
};

export default SnipperLoader;
