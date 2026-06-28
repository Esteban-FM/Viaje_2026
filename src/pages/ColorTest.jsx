 export default function ColorTest() {
      return (
          <div style={{ backgroundColor: '#11120d' }} className="min-h-screen p-8 flex flex-col gap-8 items-center justify-center">

            {/* FONDO: cambia el backgroundColor de arriba 2C2C3B 60607  ↑ */}

          {/* TARJETA   213241  18181b'*/}
          <div style={{ backgroundColor: '#464646' }} className="rounded-2xl p-5 w-72">
              <div style={{ backgroundColor: '#31323e' }} className="aspect-[4/3] rounded-xl mb-3" />
              <p style={{ color: '#ffffff' }} className="font-bold text-sm">Nombre del lugar</p>
              <p style={{ color: '#a1a1aa' }} className="text-xs mt-0.5">Ubicación</p>
            </div>

            {/* BOTÓN ACTIVO */}
          <button style={{ backgroundColor: '#f9f374', color: '#000000' }} className="py-2 px-6 rounded-full text-sm font-bold">
              BOTÓN ACTIVO
            </button>

          {/* BOTÓN INACTIVO */}
          <button style={{ backgroundColor: '#363636', color: '#ffffff' }} className="py-2 px-6 rounded-full text-sm font-bold">
              BOTÓN INACTIVO
            </button>

          </div>
        )
      }
