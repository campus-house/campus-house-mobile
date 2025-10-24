import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Review {
  id: number;
  content: string;
  rating: number;
  author: string;
  createdAt: string;
  helpfulCount: number;
}

interface BuildingReviewsModalProps {
  visible: boolean;
  onClose: () => void;
  reviews: Review[];
  isLoading: boolean;
  buildingName?: string;
}

export default function BuildingReviewsModal({
  visible,
  onClose,
  reviews,
  isLoading,
  buildingName = '건물',
}: BuildingReviewsModalProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const renderStars = (rating: number) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
        {/* 헤더 */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{buildingName} 후기</Text>
          <View style={styles.placeholder} />
        </View>

        {/* 콘텐츠 */}
        <View style={styles.content}>
          {isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#FF805F" />
              <Text style={styles.loadingText}>후기를 불러오는 중...</Text>
            </View>
          ) : reviews.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyTitle}>아직 후기가 없어요</Text>
              <Text style={styles.emptySubtitle}>첫 번째 후기를 작성해보세요!</Text>
            </View>
          ) : (
            <ScrollView style={styles.reviewsList} showsVerticalScrollIndicator={false}>
              {reviews.map((review) => (
                <View key={review.id} style={styles.reviewCard}>
                  <View style={styles.reviewHeader}>
                    <View style={styles.reviewInfo}>
                      <Text style={styles.authorName}>{review.author}</Text>
                      <Text style={styles.reviewDate}>{formatDate(review.createdAt)}</Text>
                    </View>
                    <View style={styles.ratingContainer}>
                      <Text style={styles.stars}>{renderStars(review.rating)}</Text>
                    </View>
                  </View>
                  
                  <Text style={styles.reviewContent}>{review.content}</Text>
                  
                  {review.helpfulCount > 0 && (
                    <View style={styles.helpfulContainer}>
                      <Text style={styles.helpfulText}>
                        👍 {review.helpfulCount}명이 도움이 되었다고 했어요
                      </Text>
                    </View>
                  )}
                </View>
              ))}
            </ScrollView>
          )}
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    backgroundColor: '#fff',
  },
  closeButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    fontSize: 18,
    color: '#636363',
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#323232',
    fontFamily: 'Pretendard',
  },
  placeholder: {
    width: 32,
  },
  content: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#636363',
    fontFamily: 'Pretendard',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#323232',
    fontFamily: 'Pretendard',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#636363',
    fontFamily: 'Pretendard',
    textAlign: 'center',
  },
  reviewsList: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  reviewCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  reviewInfo: {
    flex: 1,
  },
  authorName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#323232',
    fontFamily: 'Pretendard',
    marginBottom: 4,
  },
  reviewDate: {
    fontSize: 14,
    color: '#AAAAAA',
    fontFamily: 'Pretendard',
  },
  ratingContainer: {
    alignItems: 'flex-end',
  },
  stars: {
    fontSize: 16,
    color: '#FF805F',
  },
  reviewContent: {
    fontSize: 16,
    lineHeight: 24,
    color: '#323232',
    fontFamily: 'Pretendard',
    marginBottom: 12,
  },
  helpfulContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  helpfulText: {
    fontSize: 14,
    color: '#636363',
    fontFamily: 'Pretendard',
  },
});

