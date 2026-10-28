import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.5.0:0',
  releaseNotes: {
    en_US:
      'Crossbill 0.5.0: amounts in US dollars throughout, swipe between tabs, Settings in groups, a one-hour price chart and Load more in Activity. New on StartOS: a QR scanner that uses the camera of the device Crossbill is open on, or a screenshot or pasted text, for a Krux’s codes and Lightning Fork pairing.',
    es_ES:
      'Crossbill 0.5.0: importes en dólares estadounidenses en toda la app, deslizar entre pestañas, Ajustes por grupos, un gráfico de precio de una hora y Cargar más en Actividad. Nuevo en StartOS: un lector de códigos QR que usa la cámara del dispositivo donde está abierto Crossbill, o una captura de pantalla o texto pegado, para los códigos de un Krux y el emparejamiento con Lightning Fork.',
    de_DE:
      'Crossbill 0.5.0: Beträge überall in US-Dollar, Wischen zwischen Tabs, Einstellungen in Gruppen, ein Ein-Stunden-Preisdiagramm und Mehr laden in der Aktivität. Neu auf StartOS: ein QR-Scanner, der die Kamera des Geräts nutzt, auf dem Crossbill geöffnet ist, oder einen Screenshot oder eingefügten Text, für die Codes eines Krux und die Kopplung mit Lightning Fork.',
    pl_PL:
      'Crossbill 0.5.0: kwoty w dolarach amerykańskich w całej aplikacji, przesuwanie między kartami, Ustawienia w grupach, jednogodzinny wykres ceny i Wczytaj więcej w Aktywności. Nowość w StartOS: skaner kodów QR, który używa aparatu urządzenia, na którym otwarty jest Crossbill, albo zrzutu ekranu lub wklejonego tekstu, do kodów Kruxa i parowania z Lightning Fork.',
    fr_FR:
      'Crossbill 0.5.0 : montants en dollars américains partout, balayage entre les onglets, Réglages par groupes, un graphique de prix sur une heure et Charger plus dans l’Activité. Nouveau sur StartOS : un lecteur de QR codes qui utilise la caméra de l’appareil sur lequel Crossbill est ouvert, ou une capture d’écran ou un texte collé, pour les codes d’un Krux et l’appairage avec Lightning Fork.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
