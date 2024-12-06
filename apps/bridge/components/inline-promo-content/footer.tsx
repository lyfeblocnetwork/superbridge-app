import { IconFarcaster, IconX, SBLockupAlt } from "../icons";

export function Footer() {
  return (
    <>
      <footer className="grid grid-cols-2 md:grid-cols-8 gap-6 w-full py-12 max-w-[1000px] mx-auto text-xs leading-6 tracking-tight">
        <div className="col-span-2 md:col-span-3">
          <SBLockupAlt className="w-full max-w-[180px] h-auto" />
        </div>
        <div>
          <h4 className="text-muted-foreground">App</h4>
          <ul>
            <li>
              <a href="https://superbridge.app" target="_blank">
                Superbridge
              </a>
            </li>
            {/* <li>
              <a href="#">Buy</a>
            </li> */}
          </ul>
        </div>
        <div>
          <h4 className="text-muted-foreground">Solutions</h4>
          <ul>
            <li>
              <a href="https://about.superbridge.app/rollies" target="_blank">
                Rollups
              </a>
            </li>
            <li>
              <a href="https://lz.superbridge.app" target="_blank">
                Layer Zero
              </a>
            </li>
            <li>
              <a href="https://hyperlane.superbridge.app" target="_blank">
                Hyperlane
              </a>
            </li>
            {/* <li>
              <a href="#">Superchain</a>
            </li>
            <li>
              <a href="#">Deployments</a>
            </li> */}
          </ul>
        </div>
        <div>
          <h4 className="text-muted-foreground">Resources</h4>
          <ul>
            <li>
              <a href="https://docs.superbridge.app" target="_blank">
                Docs
              </a>
            </li>
            <li>
              <a href="https://github.com/superbridgeapp" target="_blank">
                Github
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-muted-foreground">Company</h4>
          <ul>
            <li>
              <a href="https://superbridge.app/terms" target="_blank">
                Terms
              </a>
            </li>
            <li>
              <a href="https://superbridge.app/privacy" target="_blank">
                Privacy
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-muted-foreground">Support</h4>
          <ul>
            <li>
              <a href="https://help.superbridge.app" target="_blank">
                Help center
              </a>
            </li>
          </ul>
          <div className="flex gap-2 mt-6">
            <a href="https://x.com/superbridgeapp" target="_blank">
              <IconX className="fill-foreground w-6 h-auto" />
            </a>
            <a href="https://warpcast.com/superbridge" target="_blank">
              <IconFarcaster className="fill-foreground w-6 h-auto" />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
