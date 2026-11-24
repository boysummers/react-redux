import { useMemo, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import DiaryCard from "../../src/components/DiaryCard";
import { toggleFavorite } from "../../src/features/diary/diarySlice";
import { useAppDispatch, useAppSelector } from "../../src/redux/hooks";
import { COLORS, RADIUS, SPACE, TYPO } from "../../src/styles/tokens";

const MOODS = ["Semua", "😊", "🎯", "😌", "😴"];

export default function HomeScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const entries = useAppSelector((state) => state.diary.entries);
  const [selectedMood, setSelectedMood] = useState("Semua");
  const favoritesCount = useMemo(() => entries.filter((item) => item.liked).length, [entries]);
  const visibleEntries = selectedMood === "Semua" ? entries : entries.filter((item) => item.mood === selectedMood);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Buku Harian</Text>
      <View style={styles.statsRow}>
        <View style={styles.statCard}><Text style={styles.statNumber}>{entries.length}</Text><Text style={styles.statLabel}>Total Diary</Text></View>
        <View style={styles.statCard}><Text style={styles.statNumber}>{favoritesCount}</Text><Text style={styles.statLabel}>Total Favorite</Text></View>
      </View>
      <Text style={styles.sectionTitle}>Filter berdasarkan mood</Text>
      <View style={styles.filterRow}>
        {MOODS.map((mood) => (
          <Pressable key={mood} onPress={() => setSelectedMood(mood)} style={[styles.filterChip, selectedMood === mood && styles.filterSelected]}>
            <Text style={[styles.filterText, selectedMood === mood && styles.filterTextSelected]}>{mood}</Text>
          </Pressable>
        ))}
      </View>
      <Text style={styles.counter}>{visibleEntries.length} diary ditampilkan</Text>
      <FlatList
        data={visibleEntries}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <DiaryCard title={item.title} date={item.date} preview={item.preview} mood={item.mood} liked={item.liked}
            onToggleFavorite={() => dispatch(toggleFavorite(item.id))}
            onPress={() => router.push({ pathname: "/detail/[id]", params: { id: String(item.id) } })} />
        )}
        ListEmptyComponent={<View style={styles.empty}><Text style={styles.emptyIcon}>{entries.length === 0 ? "📔" : "🔎"}</Text><Text style={styles.emptyTitle}>{entries.length === 0 ? "Belum ada diary" : "Diary tidak ditemukan"}</Text><Text style={styles.emptyText}>{entries.length === 0 ? "Mulai catat pengalaman dan suasana hatimu hari ini." : "Belum ada diary dengan mood ini. Coba pilih filter mood lainnya."}</Text>{entries.length === 0 && <Pressable style={styles.emptyButton} onPress={() => router.push("/(tabs)/create")}><Text style={styles.emptyButtonText}>Buat Diary Pertama</Text></Pressable>}</View>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: SPACE.l, backgroundColor: COLORS.background },
  header: { fontSize: TYPO.h1, fontWeight: "700", color: COLORS.text, marginBottom: SPACE.m },
  statsRow: { flexDirection: "row", gap: SPACE.m, marginBottom: SPACE.l },
  statCard: { flex: 1, padding: SPACE.m, borderRadius: RADIUS.card, backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.border },
  statNumber: { fontSize: 26, fontWeight: "800", color: COLORS.accent },
  statLabel: { color: COLORS.muted, marginTop: 2 },
  sectionTitle: { fontWeight: "700", color: COLORS.text, marginBottom: SPACE.s },
  filterRow: { flexDirection: "row", gap: SPACE.s, marginBottom: SPACE.m },
  filterChip: { paddingHorizontal: 13, paddingVertical: 9, borderRadius: 20, borderWidth: 1, borderColor: COLORS.border, backgroundColor: COLORS.surface },
  filterSelected: { backgroundColor: COLORS.accent, borderColor: COLORS.accent },
  filterText: { color: COLORS.text, fontSize: 15 },
  filterTextSelected: { color: "#FFFFFF", fontWeight: "700" },
  counter: { color: COLORS.muted, marginBottom: SPACE.m },
  empty: { alignItems: "center", paddingHorizontal: SPACE.l, paddingTop: 45 },
  emptyIcon: { fontSize: 42, marginBottom: SPACE.s },
  emptyTitle: { color: COLORS.text, fontSize: 18, fontWeight: "700", marginBottom: SPACE.s },
  emptyText: { color: COLORS.muted, textAlign: "center", lineHeight: 21 },
  emptyButton: { marginTop: SPACE.m, padding: 12, borderRadius: RADIUS.card, backgroundColor: COLORS.accent },
  emptyButtonText: { color: "#FFFFFF", fontWeight: "700" },
});
