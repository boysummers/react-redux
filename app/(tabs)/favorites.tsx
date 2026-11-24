import { Alert, FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { useAppDispatch, useAppSelector } from "../../src/redux/hooks";
import { clearAllFavorites, toggleFavorite } from "../../src/features/diary/diarySlice";
import DiaryCard from "../../src/components/DiaryCard";
import { COLORS, RADIUS, SPACE, TYPO } from "../../src/styles/tokens";

export default function FavoritesScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const favoriteEntries = useAppSelector((state) => state.diary.entries.filter((entry) => entry.liked));
  const confirmClear = () => Alert.alert("Hapus Semua Favorite", "Semua diary akan dihapus dari daftar favorite, tetapi diary tetap tersimpan.", [
    { text: "Batal", style: "cancel" },
    { text: "Ya, hapus", style: "destructive", onPress: () => dispatch(clearAllFavorites()) },
  ]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Favorite</Text>
      <Text style={styles.counter}>{favoriteEntries.length} diary favorite</Text>
      {favoriteEntries.length > 0 && <Pressable onPress={confirmClear} style={styles.clearButton}><Text style={styles.clearText}>Kosongkan Semua Favorite</Text></Pressable>}
      <FlatList data={favoriteEntries} keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <DiaryCard title={item.title} date={item.date} preview={item.preview} mood={item.mood} liked={item.liked}
          onToggleFavorite={() => dispatch(toggleFavorite(item.id))}
          onPress={() => router.push({ pathname: "/detail/[id]", params: { id: String(item.id) } })} />}
        ListEmptyComponent={<View style={styles.empty}><Text style={styles.emptyIcon}>♡</Text><Text style={styles.emptyTitle}>Belum ada diary favorite</Text><Text style={styles.emptyText}>Tekan ikon hati pada diary yang ingin disimpan di daftar favorite.</Text><Pressable style={styles.emptyButton} onPress={() => router.push("/(tabs)")}><Text style={styles.emptyButtonText}>Jelajahi Diary</Text></Pressable></View>} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: SPACE.l, backgroundColor: COLORS.background },
  header: { fontSize: TYPO.h1, fontWeight: "700", color: COLORS.text },
  counter: { color: COLORS.muted, marginBottom: SPACE.m },
  clearButton: { alignSelf: "flex-start", paddingHorizontal: 13, paddingVertical: 9, borderRadius: RADIUS.card, backgroundColor: "#FEE2E2", marginBottom: SPACE.m },
  clearText: { color: COLORS.danger, fontWeight: "700" },
  empty: { alignItems: "center", paddingHorizontal: SPACE.l, paddingTop: 50 },
  emptyIcon: { fontSize: 48, color: COLORS.muted, marginBottom: SPACE.s },
  emptyTitle: { fontSize: 18, fontWeight: "700", color: COLORS.text, marginBottom: SPACE.s },
  emptyText: { textAlign: "center", color: COLORS.muted, lineHeight: 21 },
  emptyButton: { marginTop: SPACE.m, padding: 12, borderRadius: RADIUS.card, backgroundColor: COLORS.accent },
  emptyButtonText: { color: "#FFFFFF", fontWeight: "700" },
});
