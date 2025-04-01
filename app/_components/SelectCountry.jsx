import { getCountries } from '@/app/_lib/data-service';

async function SelectCountry({ defaultCountry, name, id, className }) {
    const countries = await getCountries();
    const flag =
        countries.find((country) => country.name === defaultCountry)?.flag ??
        '';

    return (
        <select
            name={name}
            id={id}
            // здесь мы используем трюк, чтобы закодировать вместе названия страны и флага в значение (страна%флаг). Затем мы снова разделим их позже в server action
            defaultValue={`${defaultCountry}%${flag}`}
            className={`${className} bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm focus:rounded-sm focus:bg-primary-800
                            focus:text-primary-200`}
        >
            <option value="">Select country...</option>
            {countries.map((c) => (
                <option key={c.name} value={`${c.name}%${c.flag}`}>
                    {c.name}
                </option>
            ))}
        </select>
    );
}

export default SelectCountry;
