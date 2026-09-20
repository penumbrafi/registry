---
'@penumbrafi/registry': patch
---

Add antumbra's validator logo, completing the active set.

Every validator in the active set now has a logo on its delegation token.

Also resolves the repository's own images from disk rather than fetching them
from `main` at build time. A newly added image previously could not be used
until after it was merged — the build resolved its published URL, got a 404 and
failed — so images and the entries referencing them had to land in separate
pull requests. Foreign images are still fetched over the network.
