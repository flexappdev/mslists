
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search, Eye, Edit, Trash2, Flag, Users, TrendingUp, List } from 'lucide-react';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { sampleLists } from '@/data/sampleData';
import { useToast } from '@/hooks/use-toast';

const Admin = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();

  const handleAction = (action: string, itemId: string) => {
    toast({
      title: `${action} successful`,
      description: `The action has been completed.`,
    });
  };

  const stats = {
    totalLists: sampleLists.length,
    totalVotes: sampleLists.reduce((sum, list) => sum + list.totalVotes, 0),
    totalUsers: 1247,
    pendingReview: 5
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Button variant="ghost" asChild className="mb-4">
              <Link to="/" className="flex items-center space-x-2">
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Home</span>
              </Link>
            </Button>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-neutral-muted">Manage lists, users, and content moderation</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Lists"
            value={stats.totalLists}
            icon={List}
            trend="+12% from last month"
          />
          <StatCard
            title="Total Votes"
            value={stats.totalVotes.toLocaleString()}
            icon={TrendingUp}
            trend="+8% from last month"
          />
          <StatCard
            title="Active Users"
            value={stats.totalUsers.toLocaleString()}
            icon={Users}
            trend="+15% from last month"
          />
          <StatCard
            title="Pending Review"
            value={stats.pendingReview}
            icon={Flag}
            trend="2 new today"
            urgent
          />
        </div>

        {/* Main Content */}
        <Tabs defaultValue="lists" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="lists">Lists Management</TabsTrigger>
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="moderation">Content Moderation</TabsTrigger>
          </TabsList>

          {/* Lists Management */}
          <TabsContent value="lists" className="space-y-6">
            <div className="bg-white rounded-xl card-shadow p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">All Lists</h2>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search lists..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-900">List</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Category</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Author</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Votes</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sampleLists.map((list) => (
                      <tr key={list.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-3">
                            <img 
                              src={list.coverImage} 
                              alt={list.title}
                              className="w-12 h-12 object-cover rounded-lg"
                            />
                            <div>
                              <div className="font-medium text-gray-900">{list.title}</div>
                              <div className="text-sm text-neutral-muted">Created {list.createdAt}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <Badge variant="secondary">{list.category}</Badge>
                        </td>
                        <td className="py-4 px-4 text-neutral-muted">{list.author}</td>
                        <td className="py-4 px-4 text-neutral-muted">{list.totalVotes.toLocaleString()}</td>
                        <td className="py-4 px-4">
                          <Badge variant={list.featured ? "default" : "secondary"}>
                            {list.featured ? "Featured" : "Published"}
                          </Badge>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-2">
                            <Button size="sm" variant="ghost" asChild>
                              <Link to={`/lists/${list.slug}`}>
                                <Eye className="w-4 h-4" />
                              </Link>
                            </Button>
                            <Button 
                              size="sm" 
                              variant="ghost"
                              onClick={() => handleAction('Edit', list.id)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="ghost"
                              onClick={() => handleAction('Delete', list.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          {/* User Management */}
          <TabsContent value="users" className="space-y-6">
            <div className="bg-white rounded-xl card-shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">User Management</h2>
              <div className="text-center py-12 text-neutral-muted">
                <Users className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>User management features coming soon...</p>
              </div>
            </div>
          </TabsContent>

          {/* Content Moderation */}
          <TabsContent value="moderation" className="space-y-6">
            <div className="bg-white rounded-xl card-shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Content Moderation Queue</h2>
              <div className="text-center py-12 text-neutral-muted">
                <Flag className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>No items pending moderation</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
};

const StatCard = ({ title, value, icon: Icon, trend, urgent = false }: {
  title: string;
  value: string | number;
  icon: any;
  trend: string;
  urgent?: boolean;
}) => {
  return (
    <div className="bg-white rounded-xl card-shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-neutral-muted">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
        </div>
        <div className={`p-3 rounded-lg ${urgent ? 'bg-red-100' : 'bg-blue-100'}`}>
          <Icon className={`w-6 h-6 ${urgent ? 'text-red-600' : 'text-blue-600'}`} />
        </div>
      </div>
      <p className={`text-sm mt-4 ${urgent ? 'text-red-600' : 'text-green-600'}`}>
        {trend}
      </p>
    </div>
  );
};

export default Admin;
