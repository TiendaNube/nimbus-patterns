# classify.jq — static pre-filter for pr-autoreview in nimbus-patterns.
#
# Input: a single-element array wrapping `gh pr view --json
# number,title,additions,deletions,changedFiles,files` (`.files` is an array
# of `{path, additions, deletions}`). Output: an array of the same length,
# each element `{verdict, reason, classes, loc, nfiles}`.
#
# This repo has no "sensitive" paths in the auth/payments sense (it's a
# design-system component library), so the sensitive bucket here is the same
# thing .coderabbit.yaml's custom_checks already treat as high-risk: version
# bumps, CHANGELOG entries, and *.types.ts contracts — anything that can hide
# an undocumented breaking change.

def sensitive_path_patterns: [
  "package\\.json$",
  "CHANGELOG\\.md$",
  "\\.types\\.ts$"
];

def is_sensitive($paths):
  any($paths[]; . as $p | any(sensitive_path_patterns[]; . as $pat | $p | test($pat)));

map(
  . as $pr
  | ($pr.files | map(.path)) as $paths
  | ($pr.additions + $pr.deletions) as $loc
  | if is_sensitive($paths) then
      {verdict: "human", reason: "touches package.json, CHANGELOG.md, or a *.types.ts contract",
       classes: ["versioning"], loc: $loc, nfiles: ($paths | length)}
    elif $loc <= 20 and (all($paths[]; test("\\.md$")) or all($paths[]; test("\\.stories\\.tsx$"))) then
      {verdict: "auto", reason: "small docs/story-only change",
       classes: ["docs"], loc: $loc, nfiles: ($paths | length)}
    elif $loc > 500 then
      {verdict: "human", reason: "large change (>500 LOC)",
       classes: ["large"], loc: $loc, nfiles: ($paths | length)}
    else
      {verdict: "borderline", reason: "needs the judge's read",
       classes: ["code"], loc: $loc, nfiles: ($paths | length)}
    end
)
