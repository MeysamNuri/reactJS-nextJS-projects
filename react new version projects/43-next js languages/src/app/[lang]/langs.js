const langs = {
    en: () => import("@/src/langs/en.json").then((modul) => modul.default),
    fa: () => import("@/src/langs/fa.json").then((modul) => modul.default),
    "en-us": () => import("@/src/langs/en.json").then((modul) => modul.default),
    "fa-ir": () => import("@/src/langs/fa.json").then((modul) => modul.default)
}

export const getLangs = async (local) => {
    return langs[local]()
}