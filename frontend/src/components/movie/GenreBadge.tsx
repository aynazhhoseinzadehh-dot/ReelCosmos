interface Props {
    name: string;
}

const GenreBadge = ({ name }: Props) => {
    return (
        <span
            className="
      rounded-full
      bg-red-600/20
      border
      border-red-500/40
      px-3
      py-1
      text-sm
      font-medium
      text-red-400
    "
        >
      {name}
    </span>
    );
};

export default GenreBadge;