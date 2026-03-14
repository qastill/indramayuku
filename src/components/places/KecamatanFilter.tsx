'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronDown, Check, MapPin } from 'lucide-react'

const KECAMATAN_LIST = [
    'Anjatan', 'Arahan', 'Balongan', 'Bongas', 'Cantigi', 'Cikedung',
    'Gabuswetan', 'Gantar', 'Haurgeulis', 'Indramayu', 'Jatibarang',
    'Juntinyuat', 'Kandanghaur', 'Karangampel', 'Kedokanbunder', 'Kertasemaya',
    'Krangkeng', 'Kroya', 'Lelea', 'Lohbener', 'Losarang', 'Patrol',
    'Pasekan', 'Sindang', 'Sliyeg', 'Sukagumiwang', 'Sukra', 'Terisi',
    'Tukdana', 'Widasari', 'Bangodua'
  ]

interface Props {
    current: string
    searchParams: Record<string, string | undefined>
}

export function KecamatanFilter({ current, searchParams }: Props) {
    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false)
    const [search, setSearch] = useState('')
    const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
                if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                          setIsOpen(false)
                }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelect = (kecamatan: string) => {
        const p = new URLSearchParams()
        Object.entries(searchParams).forEach(([k, v]) => {
                if (v && k !== 'kecamatan' && k !== 'page') p.set(k, v)
        })
        if (kecamatan) p.set('kecamatan', kecamatan)
        const queryString = p.toString()
        router.push(queryString ? `/places?${queryString}` : '/places')
        setIsOpen(false)
        setSearch('')
  }

  const filteredKecamatan = KECAMATAN_LIST.filter(k =>
        k.toLowerCase().includes(search.toLowerCase())
                                                    )

  return (
        <div className="relative" ref={dropdownRef}>
                <button
                          type="button"
                          onClick={() => setIsOpen(!isOpen)}
                          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium bg-white cursor-pointer transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                      current ? 'border-blue-400 text-blue-700 bg-blue-50' : 'border-gray-200 text-gray-600 hover:border-blue-300'
                          }`}
                        >
                        <MapPin className="w-4 h-4" />
                        <span>{current ? `Kec. ${current}` : 'Semua Kecamatan'}</span>
                        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>

          {isOpen && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl border border-gray-200 shadow-xl z-50">
                            <div className="p-2 border-b border-gray-100">
                                        <input
                                                        type="text"
                                                        value={search}
                                                        onChange={(e) => setSearch(e.target.value)}
                                                        placeholder="Cari kecamatan..."
                                                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                        autoFocus
                                                      />
                            </div>
                            <button
                                          type="button"
                                          onClick={() => handleSelect('')}
                                          className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 ${
                                                          !current ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                                          }`}
                                        >
                                        <MapPin className="w-4 h-4" />
                                        <span className="flex-1 font-medium">Semua Kecamatan</span>
                              {!current && <Check className="w-4 h-4 text-blue-500" />}
                            </button>
                            <div className="h-px bg-gray-100" />
                            <div className="max-h-60 overflow-auto py-1">
                              {filteredKecamatan.map(kec => (
                                  <button
                                                    key={kec}
                                                    type="button"
                                                    onClick={() => handleSelect(kec)}
                                                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-gray-50 ${
                                                                        current === kec ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                                                    }`}
                                                  >
                                                  <span className="flex-1 text-sm">{kec}</span>
                                    {current === kec && <Check className="w-4 h-4 text-blue-500" />}
                                  </button>
                                ))}
                              {filteredKecamatan.length === 0 && (
                                  <div className="px-4 py-4 text-center text-gray-500 text-sm">Kecamatan tidak ditemukan</div>
                                        )}
                            </div>
                  </div>
              )}
        </div>
      )
}
