'use client';

import { useTheme } from "../context/theme-context";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

export default function ThemeSwitcher () {

    const { theme, setTheme } = useTheme();

    return (
        <Select onValueChange={setTheme} value={theme}>
            <SelectTrigger className="w-[160px] border-border focus-visible:ring-transparent">
                <SelectValue placeholder="Select Theme" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="purple-base">purple-base</SelectItem>
                <SelectItem value="dark-purple">dark-purple</SelectItem>
                <SelectItem value="arbitrage">Arbitrage</SelectItem>
                <SelectItem value="arbitrageNew">arbitrageNew</SelectItem>
                <SelectItem value="mirage">mirage</SelectItem>
                <SelectItem value="aegis">aegis</SelectItem>
                <SelectItem value="tropika">tropika</SelectItem>
                <SelectItem value="ashen">ashen</SelectItem>
                <SelectItem value="nova">nova</SelectItem>
                <SelectItem value="vulcan">vulcan</SelectItem>
                <SelectItem value="light-purple">light-purple</SelectItem>
                <SelectItem value="verdantTide">verdantTide</SelectItem>
            </SelectContent>
        </Select>
    )

}