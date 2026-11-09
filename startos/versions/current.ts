import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.5.1:0',
  releaseNotes: {
    en_US:
      'Crossbill 0.5.1: a coinbase reward, such as a mining payout, shows as spendable on the node’s schedule. A reward from block 979919 or later needs 25920 confirmations (about 180 days), where it had shown as ready after 6480 and the node then refused to send it. Rewards from earlier blocks are unchanged. The package is also rebuilt against the current Bitcoin and Tor packages.',
    es_ES:
      'Crossbill 0.5.1: una recompensa de coinbase, como un pago de minería, se muestra como disponible según el calendario del nodo. Una recompensa del bloque 979919 o posterior necesita 25920 confirmaciones (unos 180 días); antes aparecía como lista tras 6480 y el nodo se negaba a enviarla. Las recompensas de bloques anteriores no cambian. El paquete también se ha recompilado con los paquetes actuales de Bitcoin y Tor.',
    de_DE:
      'Crossbill 0.5.1: Eine Coinbase-Belohnung, etwa eine Mining-Auszahlung, gilt nach dem Zeitplan des Knotens als ausgebbar. Eine Belohnung ab Block 979919 braucht 25920 Bestätigungen (etwa 180 Tage); zuvor galt sie schon nach 6480 als bereit, und der Knoten lehnte das Senden dann ab. Belohnungen aus früheren Blöcken bleiben unverändert. Das Paket wurde außerdem mit den aktuellen Bitcoin- und Tor-Paketen neu gebaut.',
    pl_PL:
      'Crossbill 0.5.1: nagroda coinbase, na przykład wypłata z kopania, jest pokazywana jako gotowa do wydania zgodnie z harmonogramem węzła. Nagroda z bloku 979919 lub późniejszego wymaga 25920 potwierdzeń (około 180 dni); wcześniej pokazywała się jako gotowa po 6480, a węzeł odmawiał jej wysłania. Nagrody z wcześniejszych bloków bez zmian. Pakiet zbudowano też ponownie z aktualnymi pakietami Bitcoin i Tor.',
    fr_FR:
      'Crossbill 0.5.1 : une récompense coinbase, comme un paiement de minage, apparaît comme dépensable selon le calendrier du nœud. Une récompense du bloc 979919 ou d’un bloc ultérieur demande 25920 confirmations (environ 180 jours), alors qu’elle apparaissait prête après 6480 et que le nœud refusait ensuite de l’envoyer. Les récompenses des blocs antérieurs ne changent pas. Le paquet est aussi reconstruit avec les paquets Bitcoin et Tor actuels.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
