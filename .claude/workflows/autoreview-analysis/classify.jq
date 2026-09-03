# classify.jq — static pre-filter for pr-autoreview in nimbus-patterns.
#
# Input: a single-element array wrapping `gh pr view --json
# number,title,additions,deletions,changedFiles,files` (`.files` is an array
# of `{path, additions, deletions}`). Output: an array of the same length,
# each element `{verdict, reason, classes, loc, nfiles}`.
#
# This only auto-clears trivial docs/story-only diffs and flags oversized
# diffs for a human. It deliberately does NOT try to flag package.json /
# CHANGELOG.md / *.types.ts touches as "sensitive": in this repo almost every
# real PR touches at least one of those (SemVer bump + changelog entry is the
# normal, expected shape of a merge here), so that bucket caught nearly
# everything and added no signal. The actual risk it was meant to catch —
# an unversioned or undocumented breaking change — is exactly what the judge's
# hard rules in criteria.prompt.md already check with a real, code-aware read;
# a path-only static check can't tell a routine patch bump from a hidden
# breaking change anyway.

map(
  . as $pr
  | ($pr.files // [] | map(.path)) as $paths
  | ($pr.additions + $pr.deletions) as $loc
  | ($paths | length) as $nfiles
  | if $nfiles > 0 and $loc <= 20
      and all($paths[]; test("\\.md$") or test("\\.stories\\.tsx$")) then
      {verdict: "auto", reason: "small docs/story-only change",
       classes: ["docs"], loc: $loc, nfiles: $nfiles}
    elif $loc > 500 then
      {verdict: "manual", reason: "large change (>500 LOC)",
       classes: ["large"], loc: $loc, nfiles: $nfiles}
    else
      {verdict: "borderline", reason: "needs the judge's read",
       classes: ["code"], loc: $loc, nfiles: $nfiles}
    end
)
