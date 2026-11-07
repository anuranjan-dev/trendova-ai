<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Implement supplied homepage screens as React presentation components using shared controls and scoped semantic tokens, keeping existing workspace routes intact; this preserves navigation and theme isolation.
- Workspace (/app) colours live under html.nova-ws / .nova-ws in src/styles.css and workspace data persists via src/lib/nova/workspace-store.tsx (localStorage); keeps public pages visually isolated and there is no backend yet.
- Homepage preview pricing is centralized in a pure module with concrete tests; illustrative billing toggles stay separate from real subscriptions.
- Supplied login designs use route-local presentation and scoped semantic tokens; keep authentication behavior separate so visual imports cannot introduce fake sessions or affect other pages.
