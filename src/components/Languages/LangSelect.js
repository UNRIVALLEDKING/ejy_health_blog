import langList from './LangList';

export default function LangSelect() {
  return (
    <select
      name="HeadlineAct"
      id="HeadlineAct"
      className="mt-4 rounded-lg border-none outline-none text-black sm:text-sm px-2 py-3 bg-neutral-200/60"
    >
      {langList.map((item, id) => (
        <option key={id} value={item.code} className="p-5">
          {item.name}
        </option>
      ))}
    </select>
  );
}
