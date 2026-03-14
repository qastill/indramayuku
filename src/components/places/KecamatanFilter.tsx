'use client'
import { useRouter, usePathname } from 'next/navigation'
import { ChevronDown } from 'lucide-react'

const KECAMATAN_LIST = [
  'Indramayu', 'Sindang', 'Balongan', 'Kandanghaur', 'Losarang',
  'Cantigi', 'Arahan', 'Kedokanbunder', 'Juntinyuat', 'Karangampel',
  'Krangkeng', 'Pasekan', 'Sliyeg', 'Jatibarang', 'Bangodua',
  'Tukdana', 'Widasari', 'Kertasemaya', 'Sukagumiwang', 'Terisi',
  'Cikedung', 'Lelea', 'Bongas', 'Anjatan', 'Patrol',
  'Sukra', 'Gabuswetan', 'Kroya', 'Haurgeulis', 'Gantar', 'Trisi'
]

interface Props {
  current: string
  searchParams: Record<string, string | undefined>
  basePath?: string
}

export function KecamatanFilter({ current, searchParams, basePath }: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const base = basePath || pathname

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const kec = e.target.value
    const p = new URLSearchParams()
    Object.entries(searchParams).forEach(([k, v]) => {
      if (v && k !== 'kecamatan' && k !== 'page') p.set(k, v)
    })
    if (kec) p.set('kecamatan', kec)
    const qs = p.toString()
    router.push(qs ? `${base}?${qs}` : base)
  }

  return (
    <div className="relative">
      <select
        value={current}
        onChange={handleChange}
        className={`appearance-none pl-4 pr-8 py-2.5 rounded-xl border text-sm font-medium bg-white cursor-pointer transition-colors focus:outline-none focus:border-brand-500 ${
          current
            ? 'border-brand-400 text-brand-700 bg-brand-50'
            : 'border-gray-200 text-gray-600 hover:border-brand-300'
        }`}
      >
        <option value="">📍 Semua Kecamatan</option>
        <optgroup label="── 31 Kecamatan Indramayu ──">
          {KECAMATAN_LIST.map(kec => (
            <option key={kec} value={kec}>{kec}</option>
          ))}
        </optgroup>
      </select>
      <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
    </div>
  )
}
