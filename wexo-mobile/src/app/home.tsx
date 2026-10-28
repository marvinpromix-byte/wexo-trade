import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Yuqori Panel (Header) */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Wexo Trade</Text>
        <TouchableOpacity onPress={() => router.replace('/')} style={styles.logoutBtn}>
          <Text style={styles.logoutText}>Chiqish</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.feed}>
        {/* Xush kelibsiz Banneri */}
        <View style={styles.banner}>
          <Text style={styles.bannerTitle}>🟢 Connect Social Trading</Text>
          <Text style={styles.bannerSubtitle}>Bugungi eng so‘nggi trading signallar va VIP tahlillar</Text>
        </View>

        {/* 1-Post: Trading Signali namunasi */}
        <View style={styles.postCard}>
          <View style={styles.postHeader}>
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarText}>VIP</Text>
            </View>
            <View>
              <Text style={styles.username}>Wexo VIP Channel</Text>
              <Text style={styles.timestamp}>2 soat oldin</Text>
            </View>
          </View>

          <Text style={styles.postText}>
            🚀 #BTC / USDT Long Signal{'\n'}
            Entry: 64,500 - 65,000{'\n'}
            Target: 67,000{'\n'}
            Stop Loss: 63,200
          </Text>

          <View style={styles.signalBadge}>
            <Text style={styles.signalBadgeText}>🟢 LONG / BUY</Text>
          </View>
        </View>

        {/* 2-Post: Oddiy foydalanuvchi posti */}
        <View style={styles.postCard}>
          <View style={styles.postHeader}>
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarText}>OU</Text>
            </View>
            <View>
              <Text style={styles.username}>Otabek Yusupov</Text>
              <Text style={styles.timestamp}>5 soat oldin</Text>
            </View>
          </View>

          <Text style={styles.postText}>
            Wexo Trade mobil ilovasining Android versiyasi tayyorlanmoqda. Barchaga muvaffaqiyatli savdolar! 🔥
          </Text>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#090d16',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#1f2937',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#22c55e',
  },
  logoutBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#1f2937',
    borderRadius: 8,
  },
  logoutText: {
    color: '#ef4444',
    fontSize: 14,
    fontWeight: '600',
  },
  feed: {
    padding: 16,
  },
  banner: {
    backgroundColor: '#111827',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#22c55e33',
  },
  bannerTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  bannerSubtitle: {
    color: '#94a3b8',
    fontSize: 13,
  },
  postCard: {
    backgroundColor: '#111827',
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#1f2937',
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#22c55e22',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: '#22c55e',
    fontWeight: 'bold',
    fontSize: 12,
  },
    username: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 15,
  },
  timestamp: {
    color: '#94a3b8',
    fontSize: 12,
  },
  postText: {
    color: '#e2e8f0',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  signalBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#22c55e22',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#22c55e55',
  },
  signalBadgeText: {
    color: '#22c55e',
    fontSize: 12,
    fontWeight: 'bold',
  },
});