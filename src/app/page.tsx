"use client";

import React from "react";
import { VotingMachine } from "@/components/VotingMachine";
import { useConfig } from "@/hooks/useConfig";

export default function Home() {
  const { config, updateConfig } = useConfig();

  return <VotingMachine config={config} onUpdateConfig={updateConfig} />;
}

