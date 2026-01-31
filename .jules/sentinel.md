## 2025-05-22 - PostgREST Filter Injection and Path Traversal
**Vulnerability:** User input containing structural characters (commas, parentheses) was passed directly into Supabase's `.or()` filter, and raw `file.name` was used in storage paths.
**Learning:** PostgREST filters in Supabase rely on specific delimiters. Unsanitized input can "break out" of the intended filter logic. Storage paths are also vulnerable to traversal if filenames are not sanitized.
**Prevention:** Sanitize user-provided strings by removing or escaping structural delimiters before passing them to PostgREST filters. Use allow-list regex for filenames in storage operations.
