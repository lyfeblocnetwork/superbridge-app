import {
  arbitrum,
  arbitrumNova,
  arbitrumSepolia,
  avalanche,
  avalancheFuji,
  base,
  baseSepolia,
  berachainTestnet,
  berachainTestnetbArtio,
  blast,
  bob,
  bobSepolia,
  boba,
  bsc,
  bscTestnet,
  celo,
  celoAlfajores,
  cyber,
  degen,
  fraxtal,
  funkiMainnet,
  funkiSepolia,
  fuse,
  gnosis,
  gravity,
  ham,
  holesky,
  inEVM,
  kroma,
  linea,
  lisk,
  lukso,
  lyra,
  mainnet,
  manta,
  mantle,
  merlin,
  metis,
  mode,
  modeTestnet,
  moonbeam,
  optimism,
  optimismSepolia,
  pgn,
  polygon,
  polygonAmoy,
  polygonZkEvm,
  real,
  redstone,
  rollux,
  scroll,
  sei,
  sepolia,
  snax,
  snaxTestnet,
  superlumio,
  syscoin,
  taiko,
  xLayer,
  xai,
  zetachain,
  zora,
  zoraSepolia,
} from "viem/chains";

export const chainIcons: { [chainId: number]: string | undefined } = {
  [mainnet.id]: "/img/networks/ethereum.svg",
  [sepolia.id]: "/img/networks/sepolia.svg",
  [holesky.id]: "/img/networks/sepolia.svg",
  [arbitrumSepolia.id]: "/img/networks/arbitrum-one.svg",
  [arbitrum.id]: "/img/networks/arbitrum-one.svg",
  [arbitrumNova.id]: "/img/networks/arbitrum-nova.svg",
  [syscoin.id]: "/img/networks/syscoin.svg",
  [rollux.id]: "/img/networks/rollux.svg",
  [788988]: "/img/orb3-mainnet/network.svg",
  [pgn.id]: "/img/networks/pgn.svg",
  [kroma.id]: "/img/networks/255.svg",
  [mode.id]: "/img/networks/mode.svg",
  [modeTestnet.id]: "/img/networks/mode.svg",
  [zora.id]: "/img/networks/zora.svg",
  [zoraSepolia.id]: "/img/networks/zora.svg",
  [base.id]: "/img/networks/base.svg",
  [baseSepolia.id]: "/img/networks/base.svg",
  [optimism.id]: "/img/networks/optimism.svg",
  [optimismSepolia.id]: "/img/networks/optimism.svg",
  [bsc.id]: "/img/networks/bsc.svg",
  [bscTestnet.id]: "/img/networks/bsc.svg",
  [linea.id]: "/img/networks/linea.svg",
  [fraxtal.id]: "/img/networks/frax.svg",
  [2522]: "/img/networks/2522.svg",
  [manta.id]: "/img/networks/manta.svg",
  [inEVM.id]: "/img/networks/injective.svg",
  [blast.id]: "/img/networks/blast.svg",
  [88]: "/img/networks/viction.svg",
  [888888888]: "/img/networks/888888888.svg",
  [28122024]: "/img/networks/28122024.svg",
  [avalanche.id]: "/img/networks/avalanche.svg",
  [scroll.id]: "/img/networks/scroll.svg",
  [polygon.id]: "/img/networks/polygon.svg",
  [48900]: "/img/networks/zircuit.svg",

  [360]: "/img/networks/360.svg",
  [480]: "/img/networks/480.svg",
  [4801]: "/img/networks/4801.svg",
  [berachainTestnet.id]: "/img/networks/bera.svg",
  [berachainTestnetbArtio.id]: "/img/networks/bera.svg",
  [sei.id]: "/img/networks/sei.svg",
  [celoAlfajores.id]: "/img/networks/celo.svg",
  [celo.id]: "/img/networks/celo.svg",
  [bobSepolia.id]: "/img/networks/bob.svg",
  [bob.id]: "/img/networks/bob.svg",
  [avalancheFuji.id]: "/img/networks/avalanche.svg",
  [polygonAmoy.id]: "/img/networks/polygon.svg",
  [cyber.id]: "/img/networks/cyber.svg",
  [degen.id]: "/img/networks/degen.svg",
  [fuse.id]: "/img/networks/fuse.svg",
  [gnosis.id]: "/img/networks/gnosis.svg",
  [lisk.id]: "/img/networks/1135.svg",
  [4202]: "/img/networks/4202.svg",
  [lukso.id]: "/img/networks/lukso.svg",
  [mantle.id]: "/img/networks/mantle.svg",
  [merlin.id]: "/img/networks/merlin.svg",
  [metis.id]: "/img/networks/metis.svg",
  [moonbeam.id]: "/img/networks/moonbeam.svg",
  [polygonZkEvm.id]: "/img/networks/polygon.svg",
  [real.id]: "/img/networks/real.svg",
  [redstone.id]: "/img/networks/redstone.svg",
  [taiko.id]: "/img/networks/taiko.svg",
  [xai.id]: "/img/networks/xia.svg",
  [zetachain.id]: "/img/networks/zeta.svg",
  [xLayer.id]: "/img/networks/xlayer.svg",
  [lyra.id]: "/img/networks/957.svg",
  [383353]: "/img/networks/cheesechain.svg",
  [185]: "/img/networks/mint.svg",
  [1687]: "/img/networks/mint.svg",
  [70700]: "/img/networks/proofofplay.svg",
  [648]: "/img/networks/endurance.svg",
  [132902]: "/img/networks/form.svg",
  [325000]: "/img/networks/325000.svg",
  [5115]: "/img/networks/citrea.svg",
  [33626250]: "/img/networks/suave.svg",
  [1946]: "/img/networks/sonieum.svg",
  [1996]: "/img/networks/sanko.svg",
  [984122]: "/img/networks/forma.svg",
  [1301]: "/img/networks/unichain.svg",
  [snax.id]: "/img/networks/snaxchain.svg",
  [snaxTestnet.id]: "/img/networks/snaxchain.svg",
  [superlumio.id]: "/img/networks/lumio.svg",
  [3799]: "/img/networks/tangle.svg",
  [5845]: "/img/networks/tangle.svg",
  [6321]: "/img/networks/aura.svg",
  [994873017]: "/img/networks/lumia.svg",
  [3441006]: "/img/networks/manta.svg",
  [1513]: "/img/networks/story.svg",
  [1516]: "/img/networks/story.svg",

  [911867]: "/img/networks/odyssey.svg",
  [52085143]: "/img/networks/ethena.svg",
  [324]: "/img/networks/zkera.svg",
  [2222]: "/img/networks/kava.svg",
  [33139]: "/img/networks/apechain.svg",
  [gravity.id]: "/img/networks/gravity.svg",
  [ham.id]: "/img/networks/5112.svg",
  [funkiMainnet.id]: "/img/networks/33979.svg",
  [funkiSepolia.id]: "/img/networks/3397901.svg",
  [233]: "/img/networks/233.svg",
  [183]: "/img/networks/183.svg",
  [42019]: "/img/networks/42019.svg",
  [42026]: "/img/networks/42026.svg",
  [boba.id]: "/img/networks/288.svg",
  [28882]: "/img/networks/28882.svg",
  [19424]: "/img/networks/19424.svg",
  [80008]: "/img/networks/80008.svg",
  [8008]: "/img/networks/8008.svg",
  [625]: "/img/networks/625.svg",
  [7897]: "/img/networks/7897.svg",
  [9897]: "/img/networks/9897.svg",
  [20241133]: "/img/networks/20241133.svg",
  [53302]: "/img/networks/53302.svg",
  [5330]: "/img/networks/5330.svg",
  [763373]: "/img/networks/763373.svg",
  [747]: "/img/networks/747.svg",
  [1740]: "/img/networks/1740.svg",
  [1750]: "/img/networks/1750.svg",
  [4460]: "/img/networks/4460.svg",
  [291]: "/img/networks/291.svg",
  [6805]: "/img/networks/6805.svg",
  [6806]: "/img/networks/6806.svg",
  [11011]: "/img/networks/11011.svg",
  [17069]: "/img/networks/17069.svg",
  [58008]: "/img/networks/58008.svg",
  [2702128]: "/img/networks/2702128.svg",
  [111557560]: "/img/networks/111557560.svg",
  [254]: "/img/networks/254.svg",
  [66665]: "/img/networks/66665.svg",
  [204]: "/img/networks/204.svg",
  [1313161554]: "/img/networks/1313161554.svg",
  [1313161555]: "/img/networks/1313161555.svg",
  [250]: "/img/networks/250.svg",
  [4002]: "/img/networks/250.svg",
  [1116]: "/img/networks/1116.svg",
  [543210]: "/img/networks/543210.svg",
  [592]: "/img/networks/592.svg",
  [11124]: "/img/networks/11124.svg",
  [3888]: "/img/networks/3888.svg",
  [1285]: "/img/networks/1285.svg",
  [98865]: "/img/networks/98865.svg",
  [10888]: "/img/networks/10888.svg",
  [1923]: "/img/networks/1923.svg",
  [1924]: "/img/networks/1924.svg",
  [42793]: "/img/networks/42793.svg",
  // [swell.id]: "/img/networks/xxx.svg",
  // [nodgames.id]: "/img/networks/xxx.svg",
  // [derive.id]: "/img/networks/xxx.svg",
  // [polynominal.id]: "/img/networks/xxx.svg",
  // [ozean.id]: "/img/networks/xxx.svg",
};
