# filter.jq — decides whether a PR gets reviewed at all.
#
# Runs against a single PR object (same shape as `gh api .../pulls` or the
# `pull_request` webhook payload — `.state`, `.draft`, `.base.ref`,
# `.user.login`, `.title`, `.labels`, ...). Last output must be `true`
# (proceed) or `false`/`null` (skip).
#
# Excludes what other workflows already own end-to-end (see
# .github/workflows/auto-versioning.yml, publish.yml, post-release.yml):
# dependabot version-bump PRs and the automated release PRs.

# `dependabot[bot]` already matches the `[bot]$` suffix below, so there's no
# separate literal check for it — the suffix alone covers it (and
# github-actions[bot], the author of the release PRs excluded by
# is_release_branch below too, belt-and-braces).
def is_bot_author: .user.login | test("\\[bot\\]$");
def is_release_branch: (.head.ref // "" | test("^release/publish-"));
def has_skip_label: any(.labels[]?; .name == "no-autoreview");

.state == "open"
  and (.draft | not)
  and (.base.ref == "master")
  and (is_bot_author | not)
  and (is_release_branch | not)
  and (has_skip_label | not)
