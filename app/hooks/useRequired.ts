"use client";

import { useCallback, useMemo } from "react";

export type FieldRequirement = "required" | "optional" | "unspecified";


export type UseRequiredApi = {
	hintText: string;
};

export type UseRequiredOptions = {
	/**
	 * Choisit le texte à afficher.
	 * - "required" => "Tous les champs (*) sont requis."
	 * - "optional" => "Tous les champs (?) sont optionnels."
	 */
	hint?: Exclude<FieldRequirement, "unspecified">;
};

/**
 * Convention:
 * - Champ avec "*" ou "(*)" => requis
 * - Champ avec "?" ou "(?)" => optionnel
 */
export function useRequired(options?: UseRequiredOptions): UseRequiredApi {
	const hint = options?.hint ?? "required";
	const hintText = hint === "optional" ? "Tous les champs (?) sont optionnels." : "Tous les champs (*) sont requis.";

	return useMemo(
		() => ({
			hintText
		}),
		[hintText]
	);
}

